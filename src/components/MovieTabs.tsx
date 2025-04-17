interface Props {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MovieTabs: React.FC<Props> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="tabs-wrapper">
            <div className="movie-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MovieTabs;
