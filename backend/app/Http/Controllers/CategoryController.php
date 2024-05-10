<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    private Category $categoria;

    public function __construct(Category $categoria)
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
    public function store(StoreCategoryRequest $request)
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
    public function update(UpdateCategoryRequest $request, string $id)
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
