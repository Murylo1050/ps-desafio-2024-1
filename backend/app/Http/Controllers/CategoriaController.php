<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use App\Models\Categoria;
use Symfony\Component\HttpFoundation\Response;

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

        return response()->json($categoria, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaRequest $request)
    {
        $data = $request->validated();
        $categoria = $this->categoria->create($data);

        return response()->json($categoria, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categoria = $this->categoria->findOrFail($id);

        return response()->json($categoria, Response::HTTP_OK);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaRequest $request, string $id)
    {
        $data = $request->validated();
        $categoria = $this->categoria->findOrFail($id);
        $categoria->update($data);

        return response()->json($categoria, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoria = $this->categoria->findOrFail($id);
        $categoria->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
