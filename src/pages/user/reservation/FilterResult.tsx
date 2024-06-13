import React, { useState, useEffect } from 'react';
import apiClient from '../../../utils/config/axiosConfig';


interface Team {
	resortId : number;
	studentCount : number;
	lessonType : string;
	lessonDate : string;
	startTime : string;
	duration : number;
	level: string;
}

const FilterResult = () => {
    const [team, setTeam] = useState<Team[]>([]);

    useEffect(() => {
        const response = apiClient.post('/lesson/reserve/novice');
        setTeam(response.data);
        console.log(team);
    },[]);

    return (
        <div>
            <div>검색결과</div>
        </div>
    );
};

export default FilterResult;