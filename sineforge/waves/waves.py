class SineWave:
    def __init__(self, frequency=440, amplitude=1.0, phase=0.0):
        self.frequency = frequency
        self.amplitude = amplitude
        self.phase = phase

    def generate(self, duration, sample_rate=44100):
        import numpy as np
        t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
        return self.amplitude * np.sin(2 * np.pi * self.frequency * t + self.phase)