<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Vehicle extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'type',
        'engine_number',
        'frame_number',
    ];

    public function schedules() {
        return $this->hasMany(Schedule::class, 'vehicle_id');
    }
}
