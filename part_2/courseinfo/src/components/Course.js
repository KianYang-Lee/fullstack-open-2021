import React from 'react';
import Content from './Content';

const Section = ({ section }) => {
    return (
        <div>
            <h2>{section.name}</h2>
            <Content parts={section.parts} />
        </div>
    );
};

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => <Section key={course.id} section={course} />)}
        </div>
    );
};

export default Course;