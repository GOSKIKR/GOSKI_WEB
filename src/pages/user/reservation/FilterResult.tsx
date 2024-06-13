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
    return (
        <div>
            <div>검색결과</div>
        </div>
    );
};

export default FilterResult;