import argparse
import os
from .waves.waves import SineWave
from .io.audio import AudioIO

def main():
    parser = argparse.ArgumentParser(description="SineForge: Generate sine waves.")
    parser.add_argument('--frequency', type=float, default=440.0, help='Frequency of the sine wave in Hz')
    parser.add_argument('--amplitude', type=float, default=1.0, help='Amplitude of the sine wave')
    parser.add_argument('--phase', type=float, default=0.0, help='Phase of the sine wave in radians')
    parser.add_argument('--duration', type=float, default=1.0, help='Duration of the sine wave in seconds')
    parser.add_argument('--sample_rate', type=int, default=44100, help='Sample rate in Hz')
    parser.add_argument('--output', type=str, default='sine_wave.wav', help='Output WAV file name')
    args = parser.parse_args()

    wave = SineWave(
        frequency=args.frequency,
        amplitude=args.amplitude,
        phase=args.phase
    )
    samples = wave.generate(duration=args.duration, sample_rate=args.sample_rate)

    # Ensure data folder exists
    data_folder = os.path.join(os.path.dirname(__file__), 'data')
    os.makedirs(data_folder, exist_ok=True)
    output_path = os.path.join(data_folder, args.output)

    audio_io = AudioIO(output_path)
    audio_io.write(samples, args.sample_rate)
    print(f"Sine wave saved to {output_path}")

if __name__ == "__main__":
    main()