<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $company_siren
 * @property string $start_date
 * @property string $end_date
 * @property int $is_remote
 * @property string $internship_subject
 * @property string $student_task
 * @property string|null $comment
 * @property string $student_id
 * @property string $teacher_id
 * @property string $supervisor_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereCompanySiren($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereInternshipSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereIsRemote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereStudentTask($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereSupervisorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Internship whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Internship extends Model
{
    //
    protected $fillable = [
        "company_siren",
        "start_date",
        "end_date",
        "is_remote",
        "is_paid",
        "internship_subject",
        "student_task",
        "comment",
        "student_id",
        "teacher_id",
        "supervisor_id"
    ];
}
