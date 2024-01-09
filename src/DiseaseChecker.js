import React, { useState } from 'react'
import { diseasesData } from './diseasesData'

const DiseaseChecker = () => {

    const [userSymptoms, setUserSymptoms] = useState(['', '', '', '', ''])
    const [matchedDisease, setMatchedDisease] = useState(null)

    const handleInputChange = (index, value) => { 
        const updatedSymptoms = [...userSymptoms]
        updatedSymptoms[index] = value
        setUserSymptoms(updatedSymptoms)
    }

    const handleCheckDisease = () => {
        const matchedDisease = findMatchedDisease(userSymptoms);
        setMatchedDisease(matchedDisease);
    };

    const findMatchedDisease = (userSymptoms) => {
        let maxMatchCount = 0;
        let matchedDisease = null;

        (diseasesData.diseases).forEach((disease) => {
            let matchCount = 0;

            userSymptoms.forEach((userSymptom) => {
                if (disease.symptoms.includes(userSymptom)) {
                    matchCount++;
                }
            });

            if (matchCount > maxMatchCount && matchCount <= 4) {
                maxMatchCount = matchCount;
                matchedDisease = disease;
            }
        });

        return matchedDisease;
    };

  return (
      <div>
          <h2>Symptom Checker</h2>
          {userSymptoms.map((symptom, index) => (
              <input
                  key={index}
                  type="text"
                  placeholder={`Enter symptom ${index + 1}`}
                  value={symptom}
                  onChange={(e) => handleInputChange(index, e.target.value)}
              />
          ))}
          <button onClick={handleCheckDisease}>Check Disease</button>
          {matchedDisease && (
              <div>
                  <h3>Most Accurate Result:</h3>
                  <p>{matchedDisease.name}</p>
              </div>
          )}
      </div>
  )
}

export default DiseaseChecker