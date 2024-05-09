<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    private Categoria $categoria;

    public function __construct(Categoria $categoria)
    {
        $this->categoria = $categoria;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoria = $this->categoria->all();

        return response()->json($categoria);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaRequest $request)
    {
        $data = $request->validated();
        $categoria = $this->categoria->create($data);

        return response()->json($categoria);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categoria = $this->categoria->findOrFail($id);

        return response()->json($categoria);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaRequest $request, string $id)
    {
        $data = $request->validated();
        $categoria = $this->categoria->findOrFail($id);
        $categoria->update($data);

        return response()->json($categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoria = $this->categoria->findOrFail($id);
        $categoria->delete();

        return response()->json(['message' => 'A categoria foi excluida com sucesso']);
    }
}
