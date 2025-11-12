<?php

namespace App\Hosxp\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $connection = 'hosxp-master';

    protected $table = 'patient';

    protected $primaryKey = 'hn';

    public $incrementing = false;

}
