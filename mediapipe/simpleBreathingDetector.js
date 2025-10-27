/**
 * Simple Breathing Demo Detector
 * A working demo version without MediaPipe complexity
 */

class SimpleBreathingDetector {
  constructor() {
    this.isActive = false;
    this.breathingSignal = 0.5; // 0-1 value
    this.demoMode = true;
    this.animationPhase = 0;
    this.breathingRate = 12; // breaths per minute
    this.onBreathingUpdate = null;
    this.onFaceDetected = null;
  }

  /**
   * Start the demo breathing simulation
   */
  start() {
    this.isActive = true;
    this.demoMode = true;
    this.animate();
    console.log('Simple breathing detector started (demo mode)');
  }

  /**
   * Stop the detector
   */
  stop() {
    this.isActive = false;
    console.log('Simple breathing detector stopped');
  }

  /**
   * Animate breathing simulation
   */
  animate() {
    if (!this.isActive) return;

    // Simulate breathing cycle (4-7-8 pattern)
    const cycleTime = Date.now() / 1000; // seconds
    const breathingCycleLength = 19; // 4+7+8 seconds
    const normalizedTime = (cycleTime % breathingCycleLength) / breathingCycleLength;
    
    // Create realistic breathing wave
    this.breathingSignal = 0.5 + 0.4 * Math.sin(normalizedTime * Math.PI * 2);
    
    // Add some natural variation
    const variation = 0.1 * Math.sin(cycleTime * 0.3) * Math.random();
    this.breathingSignal = Math.max(0, Math.min(1, this.breathingSignal + variation));

    // Trigger callbacks
    if (this.onBreathingUpdate) {
      this.onBreathingUpdate({
        signal: this.breathingSignal,
        timestamp: Date.now(),
        isCalibrated: true,
        calibrationProgress: 100
      });
    }

    if (this.onFaceDetected) {
      this.onFaceDetected({
        detected: true,
        confidence: 0.9
      });
    }

    // Continue animation
    if (this.isActive) {
      requestAnimationFrame(() => this.animate());
    }
  }

  /**
   * Get current breathing state
   */
  getBreathingState() {
    if (this.breathingSignal > 0.65) return 'exhaling';
    if (this.breathingSignal < 0.35) return 'inhaling';
    return 'neutral';
  }

  /**
   * Get simulated breathing rate
   */
  getBreathingRate() {
    return this.breathingRate;
  }

  /**
   * Set demo breathing value (for slider control)
   */
  setDemoValue(value) {
    if (this.demoMode) {
      this.breathingSignal = Math.max(0, Math.min(1, value));
    }
  }

  /**
   * Get calibration status (always calibrated in demo)
   */
  getCalibrationStatus() {
    return {
      isCalibrated: true,
      progress: 100,
      samplesNeeded: 0
    };
  }

  /**
   * Reset (not needed in demo mode)
   */
  resetCalibration() {
    console.log('Demo mode - no calibration needed');
  }
}

// Export for use
if (typeof window !== 'undefined') {
  window.SimpleBreathingDetector = SimpleBreathingDetector;
}