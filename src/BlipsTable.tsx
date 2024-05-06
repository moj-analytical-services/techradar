import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TechradarData } from '../lib/main';

interface BlipsTableProps {
  teamsData: TechradarData[]; // Array of TechradarData for all teams
}

const BlipsTable: React.FC<BlipsTableProps> = ({ teamsData }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Function to aggregate and sort blip data across all teams
  const aggregateAndSortBlips = (teamsData: TechradarData[]) => {
    const aggregatedBlips: Record<string, Record<string, { ringId: string | undefined; url: string | undefined }>> = {};

    // Loop through each team's data
    teamsData.forEach(teamData => {
      const teamId = teamData.id; // Extract teamId
      if (teamId) {
        teamData.slices.forEach(slice => {
          Object.entries(slice.blipsByRing).forEach(([ringId, blips]) => {
            // Process each blip within the slice
            blips?.forEach(blip => {
              if (blip.name) {
                const validTeamId = teamId.toString(); // Ensure teamId is a string
                if (!aggregatedBlips[blip.name]) {
                  aggregatedBlips[blip.name] = {};
                }
                if (!aggregatedBlips[blip.name][validTeamId]) {
                  // Store ringId and first available URL for the blip and team
                  aggregatedBlips[blip.name][validTeamId] = {
                    ringId,
                    url: blip.url,
                  };
                }
              }
            });
          });
        });
      }
    });

    // Sort blip names alphabetically
    const sortedBlipNames = Object.keys(aggregatedBlips).sort((a, b) => a.localeCompare(b));

    // Return aggregated blips with sorted blip names
    return { aggregatedBlips, sortedBlipNames };
  };

  // Aggregate and sort blip data across all teams
  const { aggregatedBlips, sortedBlipNames } = aggregateAndSortBlips(teamsData);

  // Function to handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter blip names based on search query
  const filteredBlipNames = sortedBlipNames.filter(blipName =>
    blipName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Combined Blips</h2>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search Blips..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Blip</th>
            {/* Render team headers */}
            {teamsData.map(teamData => (
              <th key={teamData.id}>
                <Link to={`/team/${teamData.id}`}>{teamData.id}</Link>
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Render table rows for filtered blip names */}
          {filteredBlipNames.map(blipName => {
            const teamDataMap = aggregatedBlips[blipName];
            if (!teamDataMap) return null; // Skip if teamDataMap is undefined

            return (
              <tr key={blipName}>
                {/* Render blip name with link if URL exists, otherwise plain text */}
                <td>
                  {teamDataMap[Object.keys(teamDataMap)[0]].url ? (
                    <a href={teamDataMap[Object.keys(teamDataMap)[0]].url}>{blipName}</a>
                  ) : (
                    blipName
                  )}
                </td>
                {/* Render columns for each team */}
                {teamsData.map(teamData => {
                  const validTeamId = teamData.id?.toString() ?? ''; // Convert teamId to string or use empty string
                  const { ringId } = teamDataMap[validTeamId] || {};

                  if (ringId) {
                    return (
                      <td key={`${blipName}-${validTeamId}`}>
                        <Link
                          to={`/team/${validTeamId}?blip=${encodeURIComponent(blipName)}`}
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                        >
                          {ringId}
                        </Link>
                      </td>
                    );
                  } else {
                    return <td key={`${blipName}-${validTeamId}`}>-</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BlipsTable;
