import React from "react";
import { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import DateSelectorBar from "../../components/DateSelectorBar";


const Schedule: React.FC = () => {
    return (
        <div className="dashboard-page">
            <NavbarAdmin />
            <div className="schedule-time">
                <DateSelectorBar/>
            </div>
        </div>
    );
};

export default Schedule;