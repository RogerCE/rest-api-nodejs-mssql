CREATE PROCEDURE  userAddOrEdit 
(
@_id as INT,
@_user_Name as VARCHAR(100),
@_name as VARCHAR(100),
@_last_Name as VARCHAR(100),
@_email as VARCHAR(100),
@_profileID as VARCHAR(100)

)

AS


--procesamiento de informacion
 IF (@_id = 0 )
 BEGIN
    INSERT INTO Users (User_Name, Name, Last_Name, Email, Profile_ID)
    VALUES(@_user_Name, @_name, @_last_Name, @_email, @_profileID);
    SET @_id = @@IDENTITY

END


 IF (@_id !=0) 
BEGIN
    UPDATE Users
    SET
        User_Name = @_user_Name,
        Name = @_name,
        Last_Name = @_last_Name,
        Email = @_email,
        Profile_ID = @_profileID
        WHERE User_ID = @_id;

    SELECT @_id as User_ID;
END;

GO