
``` bash
npm init -y
npm install express

```

``` js
app.get('/products', (request, response) => {
    // Retorna el listado de Productos
    res.json(pm.findAll());
});


app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = pm.findById(id);

    if (!product) {
        return res.status(404).json({ error: "No encontrado" });
    }

    res.json(product);
});


app.use(express.json());

app.post('/products', (req, res) => {
    const newProduct = pm.create(req.body);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const updated = pm.update(id, req.body);

    if (!updated) {
        return res.status(404).json({ error: "No encontrado" });
    }

    res.json(updated);
});

app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const deleted = pm.delete(id);

    if (!deleted) {
        return res.status(404).json({ error: "No encontrado" });
    }

    res.json({ message: "Producto eliminado" });
});

```