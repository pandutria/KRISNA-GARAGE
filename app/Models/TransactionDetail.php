<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TransactionDetail extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'transaction_id',
        'part_id',
        'qty',
        'subtotal'
    ];

    protected $casts = [
        'transaction_id' => 'integer',
        'part_id' => 'integer',
        'qty' => 'integer',
    ];

    public function transaction() {
        return $this->belongsTo(Transaction::class);
    }

    public function part() {
        return $this->belongsTo(Part::class);
    }
}
