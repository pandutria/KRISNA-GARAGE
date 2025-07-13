<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Part extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'code',
        'type',
        'price'
    ];

    public function transactionDetail() {
        return $this->hasMany(TransactionDetail::class, 'part_id');
    }
}
