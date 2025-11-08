import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
  Slider,
  Button,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

type Voice = { freq: number; gain: number; phase: number };

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [voices, setVoices] = useState<Voice[]>([
    { freq: 220, gain: 0.3, phase: 0 },
    { freq: 330, gain: 0.3, phase: 0 },
    { freq: 440, gain: 0.3, phase: 0 },
  ]);

  const update = (i: number, key: keyof Voice, value: number) =>
    setVoices((v) =>
      v.map((voice, idx) => (idx === i ? { ...voice, [key]: value } : voice))
    );

  return (
    <>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SineForge
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => setIsRunning((s) => !s)}
            aria-label={isRunning ? "Stop" : "Start"}
          >
            {isRunning ? <StopIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Mix Sine Waves
            </Typography>
            <Stack spacing={4}>
              {voices.map((v, i) => (
                <Stack key={i} spacing={1}>
                  <Typography variant="subtitle1">Voice {i + 1}</Typography>

                  <Typography variant="caption">
                    Frequency: {v.freq.toFixed(1)} Hz
                  </Typography>
                  <Slider
                    min={20}
                    max={2000}
                    step={1}
                    value={v.freq}
                    onChange={(_, val) => update(i, "freq", val as number)}
                  />

                  <Typography variant="caption">
                    Gain: {v.gain.toFixed(2)}
                  </Typography>
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={v.gain}
                    onChange={(_, val) => update(i, "gain", val as number)}
                  />

                  <Typography variant="caption">
                    Phase: {v.phase.toFixed(2)} rad
                  </Typography>
                  <Slider
                    min={0}
                    max={6.283}
                    step={0.01}
                    value={v.phase}
                    onChange={(_, val) => update(i, "phase", val as number)}
                  />
                </Stack>
              ))}

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={isRunning ? <StopIcon /> : <PlayArrowIcon />}
                  onClick={() => setIsRunning((s) => !s)}
                >
                  {isRunning ? "Stop" : "Start"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setVoices([
                      { freq: 220, gain: 0.3, phase: 0 },
                      { freq: 330, gain: 0.3, phase: 0 },
                      { freq: 440, gain: 0.3, phase: 0 },
                    ])
                  }
                >
                  Reset
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
