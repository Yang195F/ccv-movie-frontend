interface ScreenHeaderProps {
  title: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title || "Placeholder Title"}</h1>
    </header>
  );
};

export default ScreenHeader;
