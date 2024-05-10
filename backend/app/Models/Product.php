<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'price',
        'amount',
        'image',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public static function booted()
    {
        self::deleted(function (Product $product) {
            try {
                $image_name = explode('products/', $product['image']);
                Storage::disk('public')->delete('products/'.$image_name[1]);
            } catch (Throwable) {
            }
        });
    }
}
