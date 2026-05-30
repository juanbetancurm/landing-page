import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getLocalizedGuideSteps } from "../data/guideSteps";
import { useLanguageContext } from "../hooks/useLanguageContext";

const GUIDE_STORAGE_KEY = "labolavs_landing_guide_status";
const GUIDE_REVEAL_DELAY = 320;
const GUIDE_REDUCED_MOTION_DELAY = 40;
const MESSAGE_GAP = 18;
const VIEWPORT_MARGIN = 16;
const RING_PADDING = 8;

const getGuideStatus = () => {
  try {
    return localStorage.getItem(GUIDE_STORAGE_KEY);
  } catch {
    return null;
  }
};

const setGuideStatus = (status) => {
  try {
    localStorage.setItem(GUIDE_STORAGE_KEY, status);
  } catch {
    // The guide should continue working even when storage is unavailable.
  }
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getViewportSize = () => ({
  width: document.documentElement.clientWidth || window.innerWidth,
  height: document.documentElement.clientHeight || window.innerHeight,
});

const getArrowClass = (placement) => {
  if (placement === "top") return "arrow-bottom";
  if (placement === "left") return "arrow-right";
  if (placement === "right") return "arrow-left";
  return "arrow-top";
};

const placementOptions = {
  top: ["top", "bottom", "right", "left"],
  bottom: ["bottom", "top", "right", "left"],
  left: ["left", "bottom", "top", "right"],
  right: ["right", "bottom", "top", "left"],
};

const getPlacementMetrics = (placement, rect, size, viewport) => {
  const targetCenterX = rect.left + rect.width / 2;
  const targetCenterY = rect.top + rect.height / 2;

  if (placement === "top") {
    return {
      top: rect.top - MESSAGE_GAP - size.height,
      left: targetCenterX - size.width / 2,
      fitsPrimaryAxis: rect.top - MESSAGE_GAP - size.height >= VIEWPORT_MARGIN,
    };
  }

  if (placement === "left") {
    return {
      top: targetCenterY - size.height / 2,
      left: rect.left - MESSAGE_GAP - size.width,
      fitsPrimaryAxis: rect.left - MESSAGE_GAP - size.width >= VIEWPORT_MARGIN,
    };
  }

  if (placement === "right") {
    return {
      top: targetCenterY - size.height / 2,
      left: rect.right + MESSAGE_GAP,
      fitsPrimaryAxis:
        rect.right + MESSAGE_GAP + size.width <=
        viewport.width - VIEWPORT_MARGIN,
    };
  }

  return {
    top: rect.bottom + MESSAGE_GAP,
    left: targetCenterX - size.width / 2,
    fitsPrimaryAxis:
      rect.bottom + MESSAGE_GAP + size.height <=
      viewport.height - VIEWPORT_MARGIN,
  };
};

const buildGuideLayout = (rect, preferredPlacement, messageElement) => {
  const viewport = getViewportSize();
  const size = {
    width: messageElement.offsetWidth || Math.min(300, viewport.width - 32),
    height: messageElement.offsetHeight || 180,
  };
  const targetCenterX = rect.left + rect.width / 2;
  const targetCenterY = rect.top + rect.height / 2;
  const options = placementOptions[preferredPlacement] ?? placementOptions.bottom;
  const chosenPlacement =
    options.find((placement) => {
      const metrics = getPlacementMetrics(placement, rect, size, viewport);
      return metrics.fitsPrimaryAxis;
    }) ?? "bottom";
  const metrics = getPlacementMetrics(chosenPlacement, rect, size, viewport);
  const maxLeft = Math.max(VIEWPORT_MARGIN, viewport.width - size.width - VIEWPORT_MARGIN);
  const maxTop = Math.max(VIEWPORT_MARGIN, viewport.height - size.height - VIEWPORT_MARGIN);
  const left = clamp(metrics.left, VIEWPORT_MARGIN, maxLeft);
  const top = clamp(metrics.top, VIEWPORT_MARGIN, maxTop);
  const arrowStyle = {};

  if (chosenPlacement === "top" || chosenPlacement === "bottom") {
    arrowStyle["--arrow-left"] = `${clamp(
      targetCenterX - left,
      24,
      size.width - 24
    )}px`;
  } else {
    arrowStyle["--arrow-top"] = `${clamp(
      targetCenterY - top,
      24,
      size.height - 24
    )}px`;
  }

  return {
    ring: {
      top: `${rect.top - RING_PADDING}px`,
      left: `${rect.left - RING_PADDING}px`,
      width: `${rect.width + RING_PADDING * 2}px`,
      height: `${rect.height + RING_PADDING * 2}px`,
    },
    message: {
      top: `${top}px`,
      left: `${left}px`,
      ...arrowStyle,
    },
    arrowClass: getArrowClass(chosenPlacement),
  };
};

const getFocusableGuideButtons = (messageElement) =>
  Array.from(messageElement?.querySelectorAll("button:not(:disabled)") ?? []);

const IntroGuide = () => {
  const { language, t } = useLanguageContext();
  const guideSteps = useMemo(
    () => getLocalizedGuideSteps(language),
    [language]
  );
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [layout, setLayout] = useState(null);
  const autoStartedRef = useRef(false);
  const helpButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);
  const messageRef = useRef(null);
  const nextButtonRef = useRef(null);
  const revealTimerRef = useRef(null);
  const currentStep = guideSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isFinalStep = currentStepIndex === guideSteps.length - 1;
  const countedGuideStepTotal = guideSteps.filter((step) => !step.isIntro).length;
  const showStepCount = !currentStep.isIntro;
  const countedStepNumber = guideSteps
    .slice(0, currentStepIndex + 1)
    .filter((step) => !step.isIntro).length;

  const restoreFocus = useCallback(() => {
    const lastFocusedElement = lastFocusedElementRef.current;

    if (lastFocusedElement?.isConnected) {
      lastFocusedElement.focus({ preventScroll: true });
      return;
    }

    if (helpButtonRef.current?.isConnected) {
      helpButtonRef.current.focus({ preventScroll: true });
    }
  }, []);

  const runAfterStep = useCallback(() => {
    const step = guideSteps[currentStepIndex];

    if (typeof step?.afterStep === "function") {
      step.afterStep();
    }
  }, [currentStepIndex, guideSteps]);

  const closeGuide = useCallback(
    (status) => {
      if (status) {
        setGuideStatus(status);
      }

      window.clearTimeout(revealTimerRef.current);
      runAfterStep();
      setIsActive(false);
      setLayout(null);
      window.setTimeout(restoreFocus, 0);
    },
    [restoreFocus, runAfterStep]
  );

  const startGuide = useCallback((openerElement) => {
    lastFocusedElementRef.current =
      openerElement ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);

    setCurrentStepIndex(0);
    setLayout(null);
    setIsActive(true);
  }, []);

  const moveToNextStep = useCallback(() => {
    if (isFinalStep) {
      closeGuide("completed");
      return;
    }

    runAfterStep();
    setLayout(null);
    setCurrentStepIndex((index) => Math.min(index + 1, guideSteps.length - 1));
  }, [closeGuide, guideSteps.length, isFinalStep, runAfterStep]);

  const moveToPreviousStep = useCallback(() => {
    if (isFirstStep) return;

    runAfterStep();
    setLayout(null);
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
  }, [isFirstStep, runAfterStep]);

  const positionCurrentStep = useCallback(() => {
    const step = guideSteps[currentStepIndex];
    if (!step) return;

    const target = document.querySelector(step.target);
    const messageElement = messageRef.current;

    if (!target) {
      moveToNextStep();
      return;
    }

    const rect = target.getBoundingClientRect();

    if (!messageElement || rect.width === 0 || rect.height === 0) {
      moveToNextStep();
      return;
    }

    setLayout(buildGuideLayout(rect, step.placement, messageElement));
  }, [currentStepIndex, guideSteps, moveToNextStep]);

  useEffect(() => {
    if (autoStartedRef.current || getGuideStatus() !== null) return;

    const timer = window.setTimeout(() => {
      if (autoStartedRef.current || getGuideStatus() !== null) return;

      autoStartedRef.current = true;
      startGuide();
    }, 500);

    return () => window.clearTimeout(timer);
  }, [startGuide]);

  useEffect(() => {
    if (!isActive) return;

    const step = guideSteps[currentStepIndex];
    if (!step) return;

    const target = document.querySelector(step.target);

    if (typeof step.beforeStep === "function") {
      step.beforeStep();
    }

    if (!target) {
      const timer = window.setTimeout(moveToNextStep, 0);
      return () => window.clearTimeout(timer);
    }

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
      inline: "center",
    });

    window.clearTimeout(revealTimerRef.current);
    revealTimerRef.current = window.setTimeout(
      positionCurrentStep,
      prefersReducedMotion() ? GUIDE_REDUCED_MOTION_DELAY : GUIDE_REVEAL_DELAY
    );

    return () => window.clearTimeout(revealTimerRef.current);
  }, [
    currentStepIndex,
    guideSteps,
    isActive,
    moveToNextStep,
    positionCurrentStep,
  ]);

  useEffect(() => {
    if (!isActive) return undefined;

    let frameId = 0;
    const requestPositionUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(positionCurrentStep);
    };

    window.addEventListener("resize", requestPositionUpdate);
    window.addEventListener("scroll", requestPositionUpdate, true);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", requestPositionUpdate);
      window.removeEventListener("scroll", requestPositionUpdate, true);
    };
  }, [isActive, positionCurrentStep]);

  useEffect(() => {
    if (!isActive) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGuide("skipped");
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveToNextStep();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveToPreviousStep();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableButtons = getFocusableGuideButtons(messageRef.current);
      const firstButton = focusableButtons[0];
      const lastButton = focusableButtons[focusableButtons.length - 1];

      if (!firstButton || !lastButton) return;

      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault();
        lastButton.focus();
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault();
        firstButton.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeGuide, isActive, moveToNextStep, moveToPreviousStep]);

  useEffect(() => {
    if (!isActive) return;

    const timer = window.setTimeout(() => {
      nextButtonRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [currentStepIndex, isActive]);

  return (
    <>
      <button
        ref={helpButtonRef}
        className="guide-help-button"
        data-guide="help"
        type="button"
        aria-label={t("guide.helpLabel")}
        title={t("guide.helpTitle")}
        onClick={(event) => startGuide(event.currentTarget)}
      >
        ?
      </button>

      <div className={`guide-layer ${isActive ? "active" : ""}`}>
        {isActive && (
          <>
            <div className="guide-scrim" aria-hidden="true" />
            <div
              className="guide-ring"
              aria-hidden="true"
              style={{
                visibility: layout ? "visible" : "hidden",
                ...(layout?.ring ?? {}),
              }}
            />
            <section
              ref={messageRef}
              className={`guide-message ${
                currentStep.isIntro ? "guide-message-intro" : ""
              } ${layout?.arrowClass ?? "arrow-top"}`}
              style={{
                visibility: layout ? "visible" : "hidden",
                ...(layout?.message ?? {}),
              }}
              role="dialog"
              aria-modal="true"
              aria-label={currentStep.isIntro ? t("guide.introLabel") : undefined}
              aria-labelledby={currentStep.isIntro ? undefined : "guide-title"}
              aria-describedby="guide-text"
            >
              {showStepCount && (
                <p className="guide-step-count">
                  {t("guide.stepCount", {
                    current: countedStepNumber,
                    total: countedGuideStepTotal,
                  })}
                </p>
              )}
              {!currentStep.isIntro && (
                <h3 id="guide-title">{currentStep.title}</h3>
              )}
              <p id="guide-text">{currentStep.text}</p>
              <div className="guide-controls">
                <button
                  type="button"
                  className="guide-button guide-button-secondary"
                  onClick={moveToPreviousStep}
                  disabled={isFirstStep}
                >
                  {t("guide.back")}
                </button>
                <button
                  type="button"
                  className="guide-button guide-button-ghost"
                  onClick={() => closeGuide("skipped")}
                >
                  {t("guide.skip")}
                </button>
                <button
                  ref={nextButtonRef}
                  type="button"
                  className="guide-button guide-button-primary"
                  onClick={moveToNextStep}
                >
                  {isFinalStep ? t("guide.finish") : t("guide.next")}
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default IntroGuide;
