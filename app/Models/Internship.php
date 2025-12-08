<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Internship extends Model
{
    use HasFactory;

    /**
     * La table associée au modèle.
     */
    protected $table = 'internships';

    /**
     * La clé primaire de la table.
     */
    protected $primaryKey = 'id';

    /**
     * Indique si la clé primaire est auto-incrémentée.
     */
    public $incrementing = true;

    /**
     * Le type de la clé primaire.
     */
    protected $keyType = 'int';

    /**
     * Les attributs qui peuvent être assignés en masse.
     */
    protected $fillable = [
        'company_siret',
        'start_date',
        'end_date',
        'is_remote',
        'is_paid',
        'internship_subject',
        'student_task',
        'comment',
        'student_id',
        'teacher_id',
        'supervisor_id',
    ];

    /**
     * Les attributs qui doivent être castés.
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_remote' => 'boolean',
        'is_paid' => 'boolean',
    ];

    /**
     * Relation avec le modèle Student
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    /**
     * Relation avec le modèle Teacher
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'id');
    }

    /**
     * Relation avec le modèle Supervisor
     */
    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
    }
}
