 if (attendance) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            
            const fromUTC = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
            const toUTC = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()));
            
            if (fromUTC <= todayUTC && toUTC >= todayUTC) {
                return res.status(400).json({
                    success: false,
                    message: "You cannot apply for leave on a day you have marked present."
                });
            }
        }