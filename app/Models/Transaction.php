<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Transaction extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'schedule_id',
        'total_price',
        'payment_method',
        'payment_number',
        'status',
    ];

    protected $casts = [
        'schedule_id' => 'integer',
    ];

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }

    public function transactionDetail() {
        return $this->hasMany(TransactionDetail::class, 'transaction_id');
    }
}
