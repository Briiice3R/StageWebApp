<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $mail
 * @property string|null $phone
 * @property string $company_siret
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor whereCompanySiren($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor whereMail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supervisor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Supervisor extends Model
{
    use HasFactory;

    protected $fillable = [
        "first_name",
        "last_name",
        "mail",
        "phone",
        "company_siret"
    ];
}
