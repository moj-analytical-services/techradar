import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import Techradar, { TechradarData } from '../lib/main';
import Overview from './overview';
import BlipsTable from './BlipsTable';

import team1 from './teams/team1';
import team2 from './teams/team2';
import team3 from './teams/team3';

const teamsData: TechradarData[] = [team1, team2, team3];

const NavigationLinks: React.FC = () => (
  <div style={{ paddingBottom: '10px' }}>
    <h1 style={{ fontFamily: 'Arial, Helvetica', fontWeight: 'bold', marginBottom: '0px' }}>
      Technology Radar
    </h1>
    <Link to="/" style={{ margin: '5px' }}>Overview</Link>
    <Link to="/blips" style={{ margin: '5px' }}>Blips</Link>
    {teamsData.map((teamData) => (
      <Link key={teamData.id} to={`/team/${teamData.id}`} style={{ margin: '5px' }}>
        {teamData.id}
      </Link>
    ))}
  </div>
);

const App: React.FC = () => (
  <Router>
    <div style={{ paddingLeft: '20px' }}>
      <NavigationLinks />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/blips" element={<BlipsTable teamsData={teamsData} />} />
        {teamsData.map((teamData) => (
          <Route
            key={teamData.id}
            path={`/team/${teamData.id}`}
            element={<Techradar data={teamData} options={{ radarSize: 600, colorScheme: 'white' }} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
);

export default App;
