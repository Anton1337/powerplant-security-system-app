# powerplant-security-system-app
app codebase

### Commands

- ## I  
  Clock in on arduino. App recieves
  ``` 
    I HH:MM:SS
  ```
  This Creates an "event" in database and set the time.  
  Creates an toast to show you that you clocked in.  
  Updates text on homescreen to "Clocked in"

- ## O  
  Clock Out on arduino. App recieves
  ``` 
    I HH:MM:SS r
  ```
  Where "r" is how much radiation technician accumulated that day.  
  This store the radiation and the time on the event that was created from Clock in.  
  Removes all warnings.  
  Reset the countdown timer to 0.  
  Updates text on homescreen to "Clocked out".

- ## T  
    Arduino asks for time. Returns
    ``` 
    T HH:MM:SS
    ```

- ## L  
    Arduino send seconds left until radiation time limit and coefficient. App recieves
    ``` 
    L c s
    ```
    Where "c" is coefficient of radiation.  
    Where "s" is seconds technician can stay clocked in.  
    Always sent from arduino on any event change.  
    Updates countdown timer on homescreen.  
    Saves coefficient on the event in database.  

- ## W  
    Warning from arduino. App recieves
    ``` 
    W
    ```
    If technichian did not clock out before timer expired warnings happen on application.  

- ## R  
    Arduino changes room. App recieves
    ``` 
    R x
    ```
    where "x" is rooms, 1 = "Break room", 2 = "Control room", 3 = "Reactor room".  
    Updates the event in the database and adds a room on a room list.  
    TODO?: Show what room technician is in on application.

- ## P  
    Arduino toggle a hazmatsuit. App recieves
    ``` 
    P x
    ```
    where "x" is 1 for hazmatsuit equipped and 0 for unequipped.  
    Updates the event in the database and store time for equipped/unequipped suit.  
    TODO?: Show if suit is equipped/unequipped.