<?php

namespace App\Hosxp\Models\Nkph;

use Illuminate\Database\Eloquent\Model;

class NkphHealthExam extends Model
{

    protected $connection = 'hosxp-write';

    protected $table = 'nkph_health_exam';

    protected $primaryKey = 'health_exam_id';

    public $incrementing = true;

    const UPDATED_AT = null;

    protected $fillable = ['vn'];

}
