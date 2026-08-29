        const {
            employeeId,
            empId,
            name,
            role,
            department,
            payDate,
            salaryPeriod,
            month,
            baseSalary,
            bonus,
            overtime,
            deduction,
            netSalary,
            status
        } = req.body;

        if (!employeeId || !empId || !name || !role || !department || !payDate || !salaryPeriod || !month || baseSalary === undefined || netSalary === undefined) {
            return res.status(400).json({ success: false, message: "All required payroll fields must be provided." });
        }


        if (employee.salaryPeriod === "year") {
            const yearPart = salaryPeriod.substring(0, 4);
            const existingYearly = await Payroll.findOne({
                employeeId,
                salaryPeriod: { $regex: `^${yearPart}-` }
            });
            if (existingYearly) {
                return res.status(400).json({ success: false, message: "Payslip already generated for this employee in this calendar year." });
            }
        } else {
            const existing = await Payroll.findOne({ employeeId, salaryPeriod });
            if (existing) {
                return res.status(400).json({ success: false, message: "Payslip already generated for this employee and period." });
            }
        }

        let payrollId = "";
        let unique = false;
        while (!unique) {
            const num = Math.floor(1000 + Math.random() * 9000);
            payrollId = `PAY-${num}`;
            const check = await Payroll.findOne({ payrollId });
            if (!check) {
                unique = true;
            }
        }

        const record = await Payroll.create({
            payrollId,
            employeeId,
            empId,
            name,
            role,
            department,
            payDate,
            salaryPeriod,
            month,
            baseSalary,
            bonus: bonus || 0,
            overtime: overtime || 0,
            deduction: deduction || 0,
            netSalary,
            status: status || "Paid",
            createdBy: req.user.id
        });