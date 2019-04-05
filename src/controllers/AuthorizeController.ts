const jwt = require('jsonwebtoken');

function getBearerToken(authHeader: any) {
    const headerParser = authHeader.split(" ");
    if(headerParser[0]==="JWT") {
        const token = headerParser[1];
        return token;
    }
    return false;
}

export const isUserAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({error: "Truy cập trái phép, vui lòng thử lại!"})
    } else {
        const token = getBearerToken(authHeader);

        if (token) {
            try {
                jwt.verify(token, "VNUONLINE", function(err, decode) {
                    if(err) {
                        return res.status(401).json({error: "Truy cập trái phép, vui lòng thử lại!"})
                    }
                    req.authentication = {
                        userId: decode.userId
                    };
                    next();
                });
            } catch(err) {
                    return res.status(401).json({error: "Truy cập trái phép, vui lòng thử lại!"})
            }
        } else {
            return res.status(403).json({error: "Truy cập trái phép, vui lòng thử lại!"})
        }
    }
}
