import MainFeature from '@/components/Homepage/MainFeature';
import LiveUpdates from '@/components/Homepage/LiveUpdates';
import VideoCarousel from '@/components/Homepage/VideoCarousel';


export default function HomePage() {
  return (
    <main>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', gap: '20px', padding: '20px' }}>
        <div>
          <MainFeature />
          <LiveUpdates />
            <VideoCarousel /> {/* 🔥 Add Here */}
        </div>

        {/* CenterColumn & RightColumn will go here */}
        <div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>Center Column</div>
        <div style={{ backgroundColor: '#fafafa', padding: '10px' }}>Right Column</div>
      </div>
    </main>
  );
}
