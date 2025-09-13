import { Router } from "express";
import MyList from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";

const router = Router()

router.get("/", async (req, res) => {
    connectDb()

    const { id_movie, type } = req.query

    try {
        const { _id: owner } = await JWTVerify(req)

        const existing = await MyList.findOne({
            owner,
            id_movie,
            type
        })

        if (existing) {
            return res.json({ added: true });
        } else {
            return res.json({ added: false });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Deu erro ao adicionar um filme/série na sua lista", error)
    }
})

router.put("/", async (req, res) => {
    connectDb()

    const { id, status } = req.body

    try {
        const updated = await MyList.findByIdAndUpdate(
            id, 
            { status },
            { new: true }
        )

        res.json(updated)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar status" });
    }
})

router.post("/", async (req, res) => {
    connectDb()

    const { id_movie, type } = req.body

    try {
        const { _id: owner } = await JWTVerify(req)

        const newMyListDoc = await MyList.create({
            owner,
            id_movie,
            type
        })

        res.json(newMyListDoc)
    } catch (error) {
        console.error(error)
        res.status(500).json("Erro ao adicionar um filme/série na sua lista", error)
    }
})

router.delete("/", async (req, res) => {
    connectDb()

    const { id_movie, type } = req.body;

    try {
        const { _id: owner } = await JWTVerify(req)

        const deleted = await MyList.findOneAndDelete({
            owner,
            id_movie,
            type
        })

        if (deleted) {
            return res.json({ removed: true });
        } else {
            return res.status(404).json({ removed: false, message: "Filme/série não encontrado na lista" });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Erro ao remover da lista", error)
    }
})

router.get("/all", async (req, res) => {
    connectDb()

    try {
        const { _id: owner } = await JWTVerify(req)

        const items = await MyList.find({ owner })
            .select("created_at id_movie status type")
            .sort({ created_at: -1 })

        res.json(items)
    } catch (error) {
        console.error(error)
        res.status(500).json("Erro ao buscar a lista do usuário", error)
    }
})

export default router