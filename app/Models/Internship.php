<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    //
    protected $fillable = [
        "company_siren",
        "start_date",
        "end_date",
        "is_remote",
        "internship_subject",
        "student_task",
        "comment",
        "student_id",
        "teacher_id",
        "supervisor_id"
    ];
}
