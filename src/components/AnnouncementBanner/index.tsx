import { BannerWrapper, BannerText, BannerButton } from './style';

const AnnouncementBanner = () => {
  return (
    <BannerWrapper>
      <BannerText>
        <span>Estude online,</span> no seu tempo e de onde estiver.
      </BannerText>
      <BannerButton onClick={() => window.location.href = '#contato'}>
        Saiba mais!
      </BannerButton>
    </BannerWrapper>
  );
};

export default AnnouncementBanner;
