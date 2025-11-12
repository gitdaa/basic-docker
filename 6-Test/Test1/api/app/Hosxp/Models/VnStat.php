<?php

namespace App\Hosxp\Models;

use Illuminate\Database\Eloquent\Model;

class VnStat extends Model
{
    protected $connection = 'hosxp-master';

    protected $table = 'vn_stat';

    protected $primaryKey = 'vn';

    public $incrementing = false;
}
