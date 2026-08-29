
export const createEmployee = async (req,res)=>{
    try{
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Profile image is required." });
        }

        const {employeeId,name,email,workEmail,workPassword,phone,gender,department,designation,salary,salaryPeriod,joiningDate,bankName,accountNumber,ifscCode,accountStatus} = req.body;

        const existingEmployee = await Employee.findOne({$or:[{employeeId},{email},{workEmail}]});
        if(existingEmployee){
            if (existingEmployee.employeeId === employeeId) {
                return res.status(400).json({success:false,message:"Employee ID already exists"});
            }
            if (existingEmployee.email === email) {
                return res.status(400).json({success:false,message:"Personal email already exists"});
            }
            if (existingEmployee.workEmail === workEmail) {
                return res.status(400).json({success:false,message:"Work email already exists"});
            }
            return res.status(400).json({success:false,message:"Employee already exists"});
        }

        const existingUser = await User.findOne({ email: workEmail });
        if (existingUser) {
            const correspondingEmployee = await Employee.findOne({ workEmail });
            if (!correspondingEmployee && existingUser.role !== 'admin') {
                await User.deleteOne({ _id: existingUser._id });
            } else {
                return res.status(400).json({success:false,message:"User account with this work email already exists"});
            }
        }

        const hashedPassword = await bcrypt.hash(workPassword, 10);

        let profileImageUrl = "";
        if (req.file) {
            try {
                const fileName = `emp_profile_${employeeId}_${Date.now()}_${req.file.originalname}`;
                const uploadResult = await uploadToImageKit(req.file.buffer, fileName);
                profileImageUrl = uploadResult.url;
            } catch (uploadErr) {
                return res.status(500).json({ success: false, message: uploadErr.message });
            }
        }

        let employee;
        try {
            employee = await Employee.create({
                employeeId,
                name,
                email,
                workEmail,
                workPassword,
                phone,
                gender,
                department,
                designation,
                salary,
                salaryPeriod,
                joiningDate,
                bankName,
                accountNumber,
                ifscCode,
                accountStatus,
                profileImage: profileImageUrl
            });
        } catch (dbErr) {
            if (profileImageUrl) {
                await deleteFromImageKit(profileImageUrl).catch(err => console.error("ImageKit rollback failed:", err));
            }
            return res.status(500).json({success:false,message:dbErr.message});
        }

        try {
            await User.create({
                name,
                email: workEmail,
                password: hashedPassword,
                role: "user",
                isVerified: true
            });
        } catch (userErr) {
            await Employee.findByIdAndDelete(employee._id);
            if (profileImageUrl) {
                await deleteFromImageKit(profileImageUrl).catch(err => console.error("ImageKit rollback failed:", err));
            }
            return res.status(500).json({success:false,message:"Failed to create user login credentials: " + userErr.message});
        }

        return res.status(201).json({success:true,message:"Employee created successfully",employee});
    }
    catch(error) {
        console.error("Error in createEmployee:", error);
        return res.status(500).json({success:false,message:error.message})
    }
}


export const updateEmployee = async (req,res)=>{
    let newProfileImageUrl = "";
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee){
            return res.status(404).json({success:false,message:"Employee not found"})
        }

        const data = {...req.body};
        let oldProfileImageUrl = employee.profileImage;

        if(req.file){
            try {
                const fileName = `emp_profile_${employee.employeeId}_${Date.now()}_${req.file.originalname}`;
                const uploadResult = await uploadToImageKit(req.file.buffer, fileName);
                newProfileImageUrl = uploadResult.url;
                data.profileImage = newProfileImageUrl;
            } catch (uploadErr) {
                return res.status(500).json({ success: false, message: uploadErr.message });
            }
        }

        if(data.workEmail && data.workEmail !== employee.workEmail){
            const emailExistsEmployee = await Employee.findOne({ workEmail: data.workEmail, _id: { $ne: req.params.id } });
            const emailExistsUser = await User.findOne({ email: data.workEmail });
            if(emailExistsEmployee || emailExistsUser){
                if (newProfileImageUrl) {
                    await deleteFromImageKit(newProfileImageUrl).catch(err => console.error("ImageKit rollback failed:", err));
                }
                return res.status(400).json({success:false,message:"Work email is already in use by another account"})
            }
        }

        let hashedNewPassword;
        if(data.workPassword){
            hashedNewPassword = await bcrypt.hash(data.workPassword, 10);
        }

        let user = await User.findOne({ email: employee.workEmail });
        if(user){
            if(data.name) user.name = data.name;
            if(data.workEmail) user.email = data.workEmail;
            if(hashedNewPassword) user.password = hashedNewPassword;
            await user.save();
        } else {
            const workPassword = data.workPassword || employee.workPassword;
            const workEmail = data.workEmail || employee.workEmail;
            const name = data.name || employee.name;
            const hashedPassword = hashedNewPassword || (workPassword ? await bcrypt.hash(workPassword, 10) : null);
            
            if(workEmail && hashedPassword){
                await User.create({
                    name,
                    email: workEmail,
                    password: hashedPassword,
                    role: "user",
                    isVerified: true
                });
            }
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id,data,{new:true,runValidators:true})

        if (req.file && oldProfileImageUrl) {
            await deleteFromImageKit(oldProfileImageUrl).catch(err => console.error("Failed to delete old image from ImageKit:", err));
        }

        return res.status(200).json({success:true,message:"Employee updated successfully",employee:updatedEmployee})
    } catch (error) {
        if (newProfileImageUrl) {
            await deleteFromImageKit(newProfileImageUrl).catch(err => console.error("ImageKit rollback failed:", err));
        }
        console.error("Error in updateEmployee:", error);
        return res.status(500).json({success:false,message:error.message})
    }
}