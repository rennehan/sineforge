import numpy as np
from scipy.io import wavfile

class AudioIO:
    def __init__(self, filepath):
        self.filepath = filepath

    def write(self, data, sample_rate):
        # Convert to int16 for WAV format
        if not isinstance(data, np.ndarray):
            raise ValueError("Data must be a numpy array.")
        if data.dtype != np.int16:
            data = (data * 32767).astype(np.int16)
        wavfile.write(self.filepath, sample_rate, data)