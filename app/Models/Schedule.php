<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Schedule extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'service_id',
        'mechanic_id',
        'status'
    ];

    protected $casts = [
        'customer_id' => 'integer',
        'vehicle_id' => 'integer',
        'service_id' => 'integer',
        'mechanic_id' => 'integer',
    ];


    public function customer() {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function mechanic() {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    public function service() {
        return $this->belongsTo(Service::class);
    }

    public function vehicle() {
        return $this->belongsTo(Vehicle::class);
    }

    public function transactions() {
        return $this->hasMany(Transaction::class, 'schedule_id');
    }
}
