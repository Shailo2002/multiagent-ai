import express from "express";

const router = express.Router();

// GET /api/agent/memories
router.get("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const memories = await req.app.locals.memoryService.listMemories(
      String(userId),
    );

    return res.status(200).json({
      data: memories,
    });
  } catch (error) {
    console.error("List memories error:", error);

    return res.status(500).json({
      message: "Failed to get memories",
    });
  }
});

// DELETE /api/agent/memories/:id
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const deleted = await req.app.locals.memoryService.deleteMemory({
      userId: String(userId),
      memoryId: req.params.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Memory not found",
      });
    }

    return res.status(200).json({
      message: "Memory deleted",
    });
  } catch (error) {
    console.error("Delete memory error:", error);

    return res.status(500).json({
      message: "Failed to delete memory",
    });
  }
});

export default router;
