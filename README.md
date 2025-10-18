# COMP4513-Assignment1 
### Node, SQL (via supabase)

## Overview
This project is an API for querying F1 data - circuits, constructors, drivers, races and others. Some of the data in the dataset did not load in correctly, so there are some links where the return is empty or will say nothing was found. I will give alternate request for them. 

![NodeJS](https://badgen.net/static/NodeJS/22.11.0/green) ![Express](https://badgen.net/static/Express/4.21.2/blue) ![Supabase](https://badgen.net/static/Supabase/2.48.1/red)


# API functionality

| API Endpoint  | Description |
| ------------- | ------------- |
| /api/circuits  | Returns all the circuits  |
| /api/circuits/```ref```  | Returns just the specified circuit (use the circuitRef field), e.g., /api/circuits/monaco  |
| /api/circuits/season/```year``` | Returns the circuits used in a given season (order by round in ascending order), e.g., /api/circuits/season/2020 |
| /api/constructors  | Returns all the constructors |
| /api/constructors/```ref```  | Returns just the specified constructor (use the constructorRef field), e.g., /api/constructors/mclaren |
| /api/drivers  | Returns all the drivers |
| /api/drivers/```ref```  | Returns just the specified driver (use the driverRef field), e.g., /api/drivers/hamilton |
| /api/drivers/search/```substring```| Returns the drivers whose surname (case insensitive) begins with the provided substring, e.g., /api/drivers/search/sch  |
| /api/drivers/race/```raceId```  | Returns the drivers within a given race, e.g., /api/drivers/race/1106  |
| /api/races/```raceId``` | Returns just the specified race. Don't provide the foreign key for the circuit; instead provide the circuit name, location, and country |
| /api/races/season/```year```  | Returns the races within a given season ordered by round, e.g., /api/races/season/2020 |
| /api/races/season/```year```/```round``` | Returns a specific race within a given season specified by the round number, e.g., to return the 4th race in the 2022 season: /api/races/season/2022/4 |
| /api/races/circuits/```ref```  | Returns all the races for a given circuit (use the circuitRef field), ordered by year, e.g. /api/races/circuits/monza  |
| /api/races/circuits/```ref```/season/```start```/```end``` | Returns all the races for a given circuit between two years (include the races in the provided years), e.g., /api/races/circuits/monza/season/2015/2020 or /api/races/circuits/monza/season/2020/2020 |
| /api/results/```raceId```  | Returns the results for the specified race, e.g., /api/results/1106. Don't provide the foreign keys for the race, driver, and constructor; instead provide the following fields: driver (driverRef, code, forename, surname), race (name, round, year, date), constructor (name, constructorRef, nationality). Sort by the field grid in ascending order (1st place first, 2nd place second, etc) |
| /api/results/driver/```ref```  | Returns all the results for a given driver, e.g., /api/results/driver/max_verstappen  |
| /api/results/drivers/```ref```/seasons/```start```/```end``` | Returns all the results for a given driver between two years, e.g., /api/results/drivers/sainz/seasons/2022/2022 |
| /api/qualifying/```raceId```  | Returns the qualifying results for the specified race, e.g., /api/qualifying/1106. Provide the same fields as with results for the foreign keys. Sort by the field position in ascending order |
| /api/standings/drivers/```raceId```  | Returns the current season driver standings table for the specified race, sorted by position in ascending order. Provide the same fields as with results for the driver |
| /api/standings/constructors/```raceId```  | Returns the current season constructors standings table for the specified race, sorted by position in ascending order. Provide the same fields as with results for the constructor |



# Test Links
[/api/circuits](https://comp4513-assignment1-ds8x.onrender.com/api/circuits)
  [/api/circuits/monza](https://comp4513-assignment1-ds8x.onrender.com/api/circuits/monza)
  [/api/circuits/calgary](https://comp4513-assignment1-ds8x.onrender.com/api/circuits/calgary)
  [/api/constructors](https://comp4513-assignment1-ds8x.onrender.com/api/constructors)
  [/api/constructors/ferrari](https://comp4513-assignment1-ds8x.onrender.com/api/constructors/ferrari)
  [/api/drivers](https://comp4513-assignment1-ds8x.onrender.com/api/drivers)
  [/api/drivers/Norris](https://comp4513-assignment1-ds8x.onrender.com/api/drivers/Norris)
  [/api/drivers/norris](https://comp4513-assignment1-ds8x.onrender.com/api/drivers/norris)
  [/api/drivers/connolly](https://comp4513-assignment1-ds8x.onrender.com/api/drivers/connolly)
  [/api/drivers/search/sch](https://comp4513-assignment1-ds8x.onrender.com/api/drivers/search/sch)
  [/api/drivers/search/xxxxx](https://comp4513-assignment1-ds8x.onrender.com/api/drivers/search/xxxxx)
  [/api/drivers/race/703](https://comp4513-assignment1-ds8x.onrender.com/api/drivers/race/703)
  [/api/races/12](https://comp4513-assignment1-ds8x.onrender.com/api/races/12)
  [/api/races/season/2021](https://comp4513-assignment1-ds8x.onrender.com/api/races/season/2021)
  [/api/races/season/1800](https://comp4513-assignment1-ds8x.onrender.com/api/races/season/1800)
  [/api/races/season/2020/5](https://comp4513-assignment1-ds8x.onrender.com/api/races/season/2020/5)
  [/api/races/season/2020/100](https://comp4513-assignment1-ds8x.onrender.com/api/races/season/2020/100)
  [/api/races/circuits/monza](https://comp4513-assignment1-ds8x.onrender.com/api/races/circuits/monza)
  [/api/races/circuits/monza/season/2015/2022](https://comp4513-assignment1-ds8x.onrender.com/api/races/circuits/monza/season/2015/2022)
  [/api/races/circuits/monza/season/2022/2022](https://comp4513-assignment1-ds8x.onrender.com/api/races/circuits/monza/season/2022/2022)
  [/api/results/200](https://comp4513-assignment1-ds8x.onrender.com/api/results/200)
  [/api/results/driver/hamilton](https://comp4513-assignment1-ds8x.onrender.com/api/results/driver/hamilton)
  [/api/results/driver/connolly](https://comp4513-assignment1-ds8x.onrender.com/api/results/driver/connolly)
  [/api/results/drivers/hamilton/seasons/2007/209](https://comp4513-assignment1-ds8x.onrender.com/api/results/drivers/hamilton/seasons/2007/2009)
  [/api/results/drivers/sainz/seasons/2035/2022](https://comp4513-assignment1-ds8x.onrender.com/api/results/drivers/sainz/seasons/2035/2022)
  [/api/qualifying/1106](https://comp4513-assignment1-ds8x.onrender.com/api/qualifying/1106)
  [/api/standings/drivers/1120](https://comp4513-assignment1-ds8x.onrender.com/api/standings/drivers/1120)
  [/api/standings/constructors/1120](https://comp4513-assignment1-ds8x.onrender.com/api/standings/constructors/1120)
  [/api/standings/constructors/asds](https://comp4513-assignment1-ds8x.onrender.com/api/standings/constructors/asds)
