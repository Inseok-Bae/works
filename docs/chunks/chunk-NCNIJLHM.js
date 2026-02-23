// utils/programmatic-log-transport.js
function createProgrammaticLogTransport({ project, sender } = {}) {
  const projectName = project || "unknown-project";
  const sendFn = typeof sender === "function" ? sender : (envelope) => {
    console.log("[programmatic-log]", envelope);
  };
  return {
    send(entry) {
      const envelope = {
        channel: "programmatic",
        project: projectName,
        sentAt: Date.now(),
        payload: entry
      };
      sendFn(envelope);
    }
  };
}

export {
  createProgrammaticLogTransport
};
//# sourceMappingURL=chunk-NCNIJLHM.js.map
