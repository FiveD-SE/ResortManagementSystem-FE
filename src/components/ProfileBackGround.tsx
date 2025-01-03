const ProfileBackground = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/assets/images/' : 'src/assets/images/';
  return (
    <img
      src={`${basePath}profile-background.jpg`}
      alt="profile-background"
      style={{
        width: '100%',
        height: '35vh',
        objectFit: 'cover',
      }}
    />
  );
};

export default ProfileBackground;
