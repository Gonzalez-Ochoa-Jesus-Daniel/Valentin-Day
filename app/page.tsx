import { ValentineProposal } from '@/components/valentine/valentine-proposal';

export const metadata = {
  title: 'Quieres ser mi San Valentin?',
  description: 'Una propuesta especial de San Valentin con animaciones y mucho amor',
};

export default function Page() {
  const videoUrl = "/videos/ella.mp4";
  const audioUrl = "/music/tyler.mp3";

  return (
    <ValentineProposal
      videoUrl={videoUrl}
      audioUrl={audioUrl}
    />
  );
}
