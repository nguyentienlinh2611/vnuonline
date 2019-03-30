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
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN'
        })
    } else {
        const token = getBearerToken(authHeader);

        if (token) {
            try {
                jwt.verify(token, "VNUONLINE", function(err, decode) {
                    if(err) {
                        return res.status(401).json({
                            status: 401,
                            message: 'UNAUTHORIZED'
                        })
                    }
                    req.authentication = {
                        userId: decode.userId
                    };
                    next();
                });
            } catch(err) {
                    return res.status(401).json({
                        status: 401,
                        message: 'UNAUTHORIZED'
                    })
            }
        } else {
            return res.status(403).json({
                status: 403,
                message: 'FORBIDDEN'
            })
        }
    }
}
