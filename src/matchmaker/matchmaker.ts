export { };

const functions = require("../structs/functions.js");

class matchmaker {

    public async server(ws, req) {
        const ticketId = functions.MakeID().replace(/-/ig, "");
        const matchId = functions.MakeID().replace(/-/ig, "");
        const sessionId = functions.MakeID().replace(/-/ig, "");

        Connecting();
        await functions.sleep(800);
        Waiting();
        await functions.sleep(1000);
        Queued();
        await functions.sleep(1000);
        SessionAssignment();
        await functions.sleep(1000);
        Join();

        function Connecting() {
            ws.send(JSON.stringify({
                "payload": {
                    "state": "Connecting"
                },
                "name": "StatusUpdate"
            }));
        }

        function Waiting() {
            ws.send(JSON.stringify({
                "payload": {
                    "totalPlayers": 1,
                    "connectedPlayers": 1,
                    "state": "Waiting"
                },
                "name": "StatusUpdate"
            }));
        }

        function Queued() {
            ws.send(JSON.stringify({
                "payload": {
                    "ticketId": ticketId,
                    "queuedPlayers": 0,
                    "estimatedWaitSec": 0,
                    "status": {},
                    "state": "Queued"
                },
                "name": "StatusUpdate"
            }));
        }

        function SessionAssignment() {
            ws.send(JSON.stringify({
                "payload": {
                    "matchId": matchId,
                    "state": "SessionAssignment"
                },
                "name": "StatusUpdate"
            }));
        }

        function Join() {
            ws.send(JSON.stringify({
                "payload": {
                    "matchId": matchId,
                    "sessionId": sessionId,
                    "joinDelaySec": 1
                },
                "name": "Play"
            }));
        }
    }
    
}

export default new matchmaker();