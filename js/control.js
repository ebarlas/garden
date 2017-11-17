/**
 * Simple control panel for garden preferences.
 *
 * Dependencies:
 *   - Textbox (textbox.js)
 */

GardenControl.DateSelection = {
    Year: 0,
    Month: 1,
    Day: 2
};

GardenControl.TimeSelection = {
    Hour: 0,
    Minute: 1
};

GardenControl.prototype.syncFromModel = function() {
    this.txtShowHideSun.setText([(this.showSun ? "Hide" : "Show") + " Sun"]);
    this.txtShowHideMoon.setText([(this.showMoon ? "Hide" : "Show") + " Moon"]);
    this.txtShowHideScale.setText([(this.showScale ? "Hide" : "Show") + " Scale"]);
    this.txtYear.setText([this.astro.getYear()]);
    this.txtMonth.setText([this.astro.getMonth() + 1]);
    this.txtDay.setText([this.astro.getDay()]);
    this.txtMinutes.setText([this.astro.getMinutes()]);
    this.txtHours.setText([this.astro.getHours()]);
    this.txtYear.setFill(this.dateSelection === GardenControl.DateSelection.Year);
    this.txtMonth.setFill(this.dateSelection === GardenControl.DateSelection.Month);
    this.txtDay.setFill(this.dateSelection === GardenControl.DateSelection.Day);
    this.txtHours.setFill(this.timeSelection === GardenControl.TimeSelection.Hour);
    this.txtMinutes.setFill(this.timeSelection === GardenControl.TimeSelection.Minute);
};

function GardenControl(canvas, astro) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.opened = false;
    this.showSun = true;
    this.showMoon = true;
    this.showScale = true;
    this.astro = astro;
    this.dateSelection = GardenControl.DateSelection.Day;
    this.timeSelection = GardenControl.TimeSelection.Hour;

    this.txtOpen = new Textbox()
        .setPosition({x: this.canvas.width - 20, y: 20})
        .setText(["<"])
        .setStyle(Textbox.Anchor.UpperRight);

    const txtCloseY = 20;
    this.txtClose = new Textbox()
        .setPosition({x: this.canvas.width - 20, y: txtCloseY})
        .setText([">"])
        .setStyle(Textbox.Anchor.UpperRight);

    const txtShowHideSunY = txtCloseY + this.txtClose.getHeight() + 10;
    this.txtShowHideSun = new Textbox()
        .setPosition({x: this.canvas.width - 20, y: txtShowHideSunY})
        .setText([(this.showSun ? "Hide" : "Show") + " Sun"])
        .setStyle(Textbox.Anchor.UpperRight);

    const txtShowHideMoonY = txtShowHideSunY + this.txtShowHideSun.getHeight() + 10;
    this.txtShowHideMoon = new Textbox()
        .setPosition({x: this.canvas.width - 20, y: txtShowHideMoonY})
        .setText([(this.showMoon ? "Hide" : "Show") + " Moon"])
        .setStyle(Textbox.Anchor.UpperRight);

    const txtShowHideScaleY = txtShowHideMoonY + this.txtShowHideMoon.getHeight() + 10;
    this.txtShowHideScale = new Textbox()
        .setPosition({x: this.canvas.width - 20, y: txtShowHideScaleY})
        .setText([(this.showScale ? "Hide" : "Show") + " Scale"])
        .setStyle(Textbox.Anchor.UpperRight);

    const txtDateY = txtShowHideScaleY + this.txtShowHideScale.getHeight() + 10;
    this.txtDateNext = new Textbox()
        .setPosition({x: this.canvas.width - 20, y: txtDateY})
        .setText([">"])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtDatePrev = new Textbox()
        .setPosition({x: this.txtDateNext.boundingBox(this.ctx).x - 10, y: txtDateY})
        .setText(["<"])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtYear = new Textbox({fill: this.dateSelection === GardenControl.DateSelection.Year})
        .setPosition({x: this.txtDatePrev.boundingBox(this.ctx).x - 10, y: txtDateY})
        .setText([astro.getYear()])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtMonthYearSlash = new Textbox({fill: false, margin: 0})
        .setPosition({x: this.txtYear.boundingBox(this.ctx).x, y: txtDateY})
        .setText(["/"])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtDay = new Textbox({fill: this.dateSelection === GardenControl.DateSelection.Day})
        .setPosition({x: this.txtMonthYearSlash.boundingBox(this.ctx).x, y: txtDateY})
        .setText([astro.getDay()])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtDayMonthSlash = new Textbox({fill: false, margin: 0})
        .setPosition({x: this.txtDay.boundingBox(this.ctx).x, y: txtDateY})
        .setText(["/"])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtMonth = new Textbox({fill: this.dateSelection === GardenControl.DateSelection.Month})
        .setPosition({x: this.txtDayMonthSlash.boundingBox(this.ctx).x, y: txtDateY})
        .setText([astro.getMonth() + 1])
        .setStyle(Textbox.Anchor.UpperRight);

    const txtTimeY = txtDateY + this.txtDateNext.getHeight() + 10;
    this.txtTimeNext = new Textbox()
        .setPosition({x: this.canvas.width - 20, y: txtTimeY})
        .setText([">"])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtTimePrev = new Textbox()
        .setPosition({x: this.txtTimeNext.boundingBox(this.ctx).x - 10, y: txtTimeY})
        .setText(["<"])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtMinutes = new Textbox({fill: this.timeSelection === GardenControl.TimeSelection.Minute})
        .setPosition({x: this.txtTimePrev.boundingBox(this.ctx).x - 10, y: txtTimeY})
        .setText([astro.getMinutes()])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtSlash = new Textbox({fill: false, margin: 0})
        .setPosition({x: this.txtMinutes.boundingBox(this.ctx).x, y: txtTimeY})
        .setText([":"])
        .setStyle(Textbox.Anchor.UpperRight);
    this.txtHours = new Textbox({fill: this.timeSelection === GardenControl.TimeSelection.Hour})
        .setPosition({x: this.txtSlash.boundingBox(this.ctx).x, y: txtTimeY})
        .setText([astro.getHours()])
        .setStyle(Textbox.Anchor.UpperRight);
}

GardenControl.prototype.onTap = function (click) {
    let result = false;
    if (this.opened) {
        if (this.txtClose.contains(this.ctx, click.x, click.y)) {
            this.opened = false;
            result = true;
        }
        if (this.txtShowHideSun.contains(this.ctx, click.x, click.y)) {
            this.showSun = !this.showSun;
            result = true;
        }
        if (this.txtShowHideMoon.contains(this.ctx, click.x, click.y)) {
            this.showMoon = !this.showMoon;
            result = true;
        }
        if (this.txtShowHideScale.contains(this.ctx, click.x, click.y)) {
            this.showScale = !this.showScale;
            result = true;
        }
        if (this.txtDateNext.contains(this.ctx, click.x, click.y)) {
            if (this.dateSelection === GardenControl.DateSelection.Year) {
                this.astro.addYear(1);
                result = true;
            } else if (this.dateSelection === GardenControl.DateSelection.Month) {
                this.astro.addMonth(1);
                result = true;
            } else {
                this.astro.addDay(1);
                result = true;
            }
        }
        if (this.txtDatePrev.contains(this.ctx, click.x, click.y)) {
            if (this.dateSelection === GardenControl.DateSelection.Year) {
                this.astro.addYear(-1);
                result = true;
            } else if (this.dateSelection === GardenControl.DateSelection.Month) {
                this.astro.addMonth(-1);
                result = true;
            } else {
                this.astro.addDay(-1);
                result = true;
            }
        }
        if (this.txtTimeNext.contains(this.ctx, click.x, click.y)) {
            if (this.timeSelection === GardenControl.TimeSelection.Hour) {
                this.astro.addHours(1);
                result = true;
            } else {
                this.astro.addMinutes(1);
                result = true;
            }
        }
        if (this.txtTimePrev.contains(this.ctx, click.x, click.y)) {
            if (this.timeSelection === GardenControl.TimeSelection.Hour) {
                this.astro.addHours(-1);
                result = true;
            } else {
                this.astro.addMinutes(-1);
                result = true;
            }
        }
        if (this.txtYear.contains(this.ctx, click.x, click.y)) {
            this.dateSelection = GardenControl.DateSelection.Year;
            result = true;
        }
        if (this.txtMonth.contains(this.ctx, click.x, click.y)) {
            this.dateSelection = GardenControl.DateSelection.Month;
            result = true;
        }
        if (this.txtDay.contains(this.ctx, click.x, click.y)) {
            this.dateSelection = GardenControl.DateSelection.Day;
            result = true;
        }
        if (this.txtHours.contains(this.ctx, click.x, click.y)) {
            this.timeSelection = GardenControl.TimeSelection.Hour;
            result = true;
        }
        if (this.txtMinutes.contains(this.ctx, click.x, click.y)) {
            this.timeSelection = GardenControl.TimeSelection.Minute;
            result = true;
        }
    } else {
        if (this.txtOpen.contains(this.ctx, click.x, click.y)) {
            this.opened = true;
            result = true;
        }
    }

    this.syncFromModel();

    return result;
};

GardenControl.prototype.render = function () {
    if (this.opened) {
        this.txtClose.render(this.ctx);
        this.txtShowHideSun.render(this.ctx);
        this.txtShowHideMoon.render(this.ctx);
        this.txtShowHideScale.render(this.ctx);
        this.txtDateNext.render(this.ctx);
        this.txtDatePrev.render(this.ctx);
        this.txtYear.render(this.ctx);
        this.txtMonthYearSlash.render(this.ctx);
        this.txtDay.render(this.ctx);
        this.txtDayMonthSlash.render(this.ctx);
        this.txtMonth.render(this.ctx);
        this.txtTimeNext.render(this.ctx);
        this.txtTimePrev.render(this.ctx);
        this.txtHours.render(this.ctx);
        this.txtSlash.render(this.ctx);
        this.txtMinutes.render(this.ctx);
    } else {
        this.txtOpen.render(this.ctx);
    }
};

