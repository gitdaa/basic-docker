<?php

namespace App\Hosxp\Models;

use Illuminate\Database\Eloquent\Model;

class LabHead extends Model
{
    protected $connection = 'hosxp-master';

    protected $table = 'lab_head';

    protected $primaryKey = 'lab_order_number';

    public $incrementing = false;

}
