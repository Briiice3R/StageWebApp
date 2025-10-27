<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    protected $fillable = [
        "first_name",
        "last_name",
        "mail",
        "phone",
        "company_siren"
    ];
}
