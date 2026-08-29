 if (user.role !== "admin") {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const todayStr = `${year}-${month}-${day}`;

            filtered = announcements.filter((item) => {
                const rawEndDate = item.toDate || item.fromDate || item.createdAt;
                if (!rawEndDate) return true;
                const endObj = new Date(rawEndDate);
                if (Number.isNaN(endObj.getTime())) return true;

                const endYear = endObj.getFullYear();
                const endMonth = String(endObj.getMonth() + 1).padStart(2, "0");
                const endDay = String(endObj.getDate()).padStart(2, "0");
                const endDateStr = `${endYear}-${endMonth}-${endDay}`;
                if (endDateStr < todayStr) return false;

                return true;
            });
        }
